import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import Defaultphoto from './../assets/image/Defaultphoto';
import axios from 'axios';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
        setBlog(response.data.data);
      } catch (error) {
        console.error('Error fetching the blog details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        blog && (
          <>
            <Typography variant="h4" gutterBottom align='center'>
              {blog.title}
            </Typography>
            <img height={300} width="100%" src={blog.thumbnail?.lqip?blog?.thumbnail?.lqip:Defaultphoto} alt={blog.altText || blog.title} />
            {blog.artwork_type_title} | {blog.classification_title}
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: blog.description }} />
            <Typography align='center'>
              {blog.artist_title?`Artist of blog ${blog.artist_title}`:""}
            </Typography>
          </>
        )
      )}
    </Container>
  );
};

export default BlogDetailPage;
