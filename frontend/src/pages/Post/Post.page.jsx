import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, LoadingOverlay, Box } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const PostPage = () => {
  const posts = useLoaderData();// load한 데이터를 가져옴

  const [visible] = useDisclosure(true); // Set visible to true initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.error("setLoading(true)");
        setLoading(true); // API 호출 전에 로딩 상태를 true로 설정
        const res = await axios.get(`${DOMAIN}/api/posts`);
        console.error("setLoading(false)");
        setLoading(false); // API 호출 후에 로딩 상태를 false로 설정
      } catch (e) {
        console.error("Error fetching data:", e);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
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