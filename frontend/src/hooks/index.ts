import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogsType } from "../types";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogsType[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("jwt")
                }
            });
            setBlogs(res.data.blogs);
            setLoading(false);
        }
        
        fetchData();
    }, []);

    return {
        loading,
        blogs
    };
}

export const useBlog = ({id}: {id: number}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogsType>();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("jwt")
                }
            });
            setBlog(res.data.blog);
            setLoading(false);
        }
        
        fetchData();
    }, [id]);

    return {
        loading,
        blog
    };
}
