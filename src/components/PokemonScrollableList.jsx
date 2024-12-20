import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

function PokemonScrollableList({ onSelect }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon-species?limit=20&offset=0');
    const listRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startScrollTop, setStartScrollTop] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [lastTime, setLastTime] = useState(0);
    const velocityRef = useRef(0); // Vitesse en px/ms
    const animationFrameRef = useRef(null);

    const loadPokemons = useCallback(async () => {
        if (loading || !hasMore || !nextUrl) return;
        setLoading(true);
        try {
            const speciesListResponse = await axios.get(nextUrl);
            const speciesArray = speciesListResponse.data.results;

            // Si aucun species n'est retourné, arrêter le chargement
            if (speciesArray.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }

            const allPromises = speciesArray.map(async (speciesItem) => {
                const speciesData = await axios.get(speciesItem.url);
                const frenchName =
                    speciesData.data.names.find((n) => n.language.name === 'fr')?.name ||
                    speciesData.data.name;
                return {
                    id: speciesData.data.id,
                    nameEn: speciesData.data.name,
                    nameFr: frenchName,
                };
            });

            const fullList = await Promise.all(allPromises);
            setPokemonList((prevList) => {
                // Créer un Set des IDs existants pour éviter les doublons
                const existingIds = new Set(prevList.map(p => p.id));
                const newPokemons = fullList.filter(p => !existingIds.has(p.id));
                return [...prevList, ...newPokemons.sort((a, b) => a.id - b.id)];
            });

            setNextUrl(speciesListResponse.data.next);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors du chargement des noms de Pokémon.", error);
            setLoading(false);
        }
    }, [loading, hasMore, nextUrl]);

    useEffect(() => {
        loadPokemons();
    }, [loadPokemons]);

    const handleScroll = useCallback(() => {
        if (!listRef.current || loading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollHeight - scrollTop - clientHeight < 100) {
            loadPokemons();
        }
    }, [loading, hasMore, loadPokemons]);


    useEffect(() => {
        const currentRef = listRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);


    const handleClick = (pokemon) => {
        onSelect(pokemon.nameEn);
    };


    const handleMouseDown = (e) => {
        if (!listRef.current) return;
        setIsDragging(true);
        setStartY(e.clientY);
        setStartScrollTop(listRef.current.scrollTop);

        setLastY(e.clientY);
        setLastTime(performance.now());

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !listRef.current) return;

        const deltaY = e.clientY - startY;
        listRef.current.scrollTop = startScrollTop - deltaY;

        const now = performance.now();
        const elapsed = now - lastTime;
        const distance = e.clientY - lastY;

        setLastY(e.clientY);
        setLastTime(now);

        velocityRef.current = distance / elapsed;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        startMomentumScroll();
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            startMomentumScroll();
        }
    };

    const startMomentumScroll = () => {
        if (!listRef.current) return;
        const element = listRef.current;
        let velocity = velocityRef.current;

        const friction = 0.97;
        const minVelocity = 0.01;

        const step = () => {
            element.scrollTop -= velocity * 16;
            velocity *= friction;

            if (
                Math.abs(velocity) < minVelocity ||
                element.scrollTop === 0 ||
                element.scrollTop === element.scrollHeight - element.clientHeight
            ) {
                return;
            }

            animationFrameRef.current = requestAnimationFrame(step);
        };

        animationFrameRef.current = requestAnimationFrame(step);
    };

    return (
        <div
            className="hoverElement"
            ref={listRef}
            style={{
                fontFamily: 'Pokemon',
                border: 'double 6px black',
                borderRadius: '5px',
                height: '66%',
                width: '200px',
                scrollbarWidth: 'thin',
                overflowY: 'auto',
                padding: '5px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {pokemonList.map((p) => (
                <div
                    className="listItemHover"
                    key={p.id}
                    style={{ cursor: 'pointer', marginBottom: '5px' }}
                    onClick={() => handleClick(p)}
                >
                    {String(p.id).padStart(3, '0')} - {p.nameFr}
                </div>
            ))}
            {loading && <div>Chargement...</div>}
            {!hasMore && <div>Fin de la liste.</div>}
        </div>
    );
}

export default PokemonScrollableList;
