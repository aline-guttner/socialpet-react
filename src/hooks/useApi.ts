import useSWR from 'swr';
import http from 'api';


export function useApi(url: string | null) {
    const { data, error, mutate } = useSWR(url, async (url) => {
        const { data } = await http.get(url);
        return data;
    });

    return { data, error, mutate }
};

