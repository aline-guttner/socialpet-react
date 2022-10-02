import Post from "components/Post";
import { PostContext } from "contexts/PostContext";
import IPost from "interfaces/IPost";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from 'pages/Feed/Feed.module.scss';
import style from './UserPosts.module.scss';
import sectionStyle from 'styles/Section.module.scss';

export default function UserPosts() {
    const { feed, getPosts, userPosts } = useContext(PostContext)
    const params = useParams()

    useEffect(() => {
        getPosts(params.id)
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