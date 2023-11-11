import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, LoadingOverlay, Box } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const PostPage = () => {
  const posts = useLoaderData();
  const [visible] = useDisclosure(true); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.error("setLoading(true)");
        setLoading(true);
        const res = await axios.get(`${DOMAIN}/api/posts`);
        console.error("setLoading(false)");
        setLoading(false);
      } catch (e) {
        console.error("Error fetching data:", e);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);
  
  return (
    <Box pos="relative">
      {loading && (
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}
      <Container>
        <SimpleGrid h={400} cols={3}>
          {posts.map((post) => (
            <ArticleCardImage key={post.title} {...post} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("PostPage");
  return res.data;
};