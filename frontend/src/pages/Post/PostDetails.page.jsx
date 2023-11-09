import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Image, Group, Text, TextInput } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { useEditStore } from "../../store/EditStore";
import useBoundStore from "../../store/Store";
import { useState } from "react";
import { useEffect } from "react";

function PostDetailsPage() {
    const post = useLoaderData();
    // const getPostData = async () => {
    //     let post = await useLoaderData(); 
    //     return post
    // }
    const { editMode, toggleEditMode, editPost, editedList, setEditedList } = useEditStore((state) => state)
    const { user } = useBoundStore((state) => state);
    
    useEffect(() => {
        // getPostData();
        const handlePopstate = () => {
        if (editMode) {
            toggleEditMode();
        }
        };
        window.addEventListener("popstate", handlePopstate);
        return () => {
        window.removeEventListener("popstate", handlePopstate);
        };
    }, [editMode, toggleEditMode]);

    const handleEdit = () => {
        editPost(post)
        toggleEditMode();
    };

    const handleUpdate = async () => {
        try {
        const res = await axios.post(`${DOMAIN}/api/posts/update`, editedList);
        console.log("I ran on updateeeeeeeee!");
        //   post = res.data
        setEditedList({});
        console.log("post!", post);
        toggleEditMode();
        // setEditedList({});
        } catch (error) {
        console.error("Error updating post:", error);
        }
    }

    return (
        <>
        <Container>
        <Group wrap="nowrap">
        <div>
            {editMode ? (
            <>
                {post && (
                <Text size="xl" h="auto" w={300}>AUTHOR: {post.userName} <br/><br/></Text>
                )}            
                <TextInput
                label="Title"
                value={editedList.title}
                onChange={(e) => editPost({ ...editedList, title: e.target.value })}
                />
                <TextInput
                label="Category"
                value={editedList.category}
                onChange={(e) => editPost({ ...editedList, category: e.target.value })}
                />
                <TextInput
                label="Image"
                value={editedList.image}
                onChange={(e) => editPost({ ...editedList, image: e.target.value })}
                />
                <TextInput
                label="Content"
                value={editedList.content}
                // onChange={(e) => editPost(e.target.value)}
                onChange={(e) => editPost({ ...editedList, content: e.target.value })}
                />
                <br/><br/>
            </>
            ) : (
            <>
                <Text size="xl" h="auto" w={300}>AUTHOR:{post.userName} <br/><br/></Text>
                <Text size="xl" fw={700} h="auto" w={300}>TITLE: {post.title}<br/><br/></Text>
                <Text tt="uppercase" h="auto" w={300}>Category: {post.category}<br/><br/></Text>
                <Text h="auto" w={300}>CONTENT: {post.content}<br/><br/></Text>
            </>
            )}
        </div>
        <Image
            radius="md" h="auto" w={400} fit="contain"
            src={post.image}        
        />
        </Group>
        
        {!editMode && (
            <Button
            onClick={() => {
                window.location.href = '/posts';
            }}
            style={{ marginRight: '10px'}}
            >
            Back to Posts
            </Button>
        )}
        {user.id === post.userId && (
            <Button onClick={editMode ? handleUpdate : handleEdit}>
            {editMode ? "Update" : "Edit"}
            </Button>
        )}
        </Container>
    </>
    );
    }

    export const postDetailsLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    console.log("params.id:", params)
    console.log("res.data", res.data)
    console.log("I ran post details loader!");
    return res.data;
    };

    export default PostDetailsPage;
