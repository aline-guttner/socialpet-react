import Post from "components/Post";
import { PostContext } from "contexts/PostContext";
import IPost from "interfaces/IPost";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from 'pages/Feed/Feed.module.scss';
import style from './UserPosts.module.scss';
import { useApi } from "hooks/useApi";

export default function UserPosts() {
    const { getPosts, userPosts } = useContext(PostContext)
    const params = useParams()
    const { data } = useApi('posts/')

    useEffect(() => {
        getPosts(params.id, data)
    }, [])

    return (
        <>
            <section><h2 className={style.publicacao}>Suas publicações</h2></section>
            {userPosts.length ?
                <section className={styles.postagens}>
                    {userPosts.map((post: IPost) => (
                        <Post post={post} key={post._id} />))}
                </section>
                : <section>Você ainda não publicou nada.</section>}

        </>

    )
}