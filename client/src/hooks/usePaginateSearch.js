import { useState, useEffect } from "react";
import axios from "axios";

export default function usePaginateFetch(
    keyword,
    page,
    limit,
    sort = "createdAt"
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    useEffect(() => {
        setResults([]);
    }, [keyword]);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        axios({
            method: "GET",
            url: `/api/products`,
            params: { page, limit, sort, keyword },
        })
            .then((res) => {
                if (isMounted) {
                    setResults((prevResults) => {
                        return [...prevResults, ...res.data.docs].filter(
                            (value, index, self) =>
                                index ===
                                self.findIndex(
                                    (t) =>
                                        t._id === value._id &&
                                        t.name === value.name
                                )
                        );
                    });

                    setHasNext(res.data.next);
                    setHasPrevious(res.data.previous);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log(e);
                if (isMounted) {
                    setLoading(false);
                    setError(true);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            isMounted = false;
        };
    }, [keyword, page, limit, sort]);

    return { loading, error, results, hasNext, hasPrevious };
}
