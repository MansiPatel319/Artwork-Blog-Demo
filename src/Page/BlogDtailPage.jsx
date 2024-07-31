import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress,Box, AppBar,Toolbar, IconButton} from '@mui/material';
import Defaultphoto from './../assets/image/Defaultphoto';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

const BlogDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => {
    navigate(`/`);
  };

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
          <AppBar component="div" style={{backgroundColor:'transparent', color:'black', position:'relative'}}>
          <Toolbar  sx={{display: 'flex', flexDirection:'row', align:'center', backgroundColor:'transparent', mb:'10' }}>
          <IconButton onClick={handleBackClick} aria-label="back">
        <ArrowBackIcon />
      </IconButton>
            <Typography variant='h4'  gutterBottom align='center' component="div" style={{display: 'flex',  justifyContent:'center', width:'100%'}}>
              Blog Detail
            </Typography>
          </Toolbar>
          </AppBar>
          <Box component="main" >
          <span style={{float:'right', marginTop:'20px', fontSize:'23px'}}>{format(new Date(blog.source_updated_at), 'MMMM dd, yyyy h:mm a')}</span>
            <img height={300} width="100%" src={blog.thumbnail?.lqip?blog?.thumbnail?.lqip:Defaultphoto} alt={blog.altText || blog.title} />
            {blog.artwork_type_title} | {blog.department_title}
            <span style={{float:'right'}}>{blog.dimensions}</span>

            <Typography  gutterBottom align='center'>
             <b>{blog.title}</b> 
            </Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: blog.description }} />
            <Typography align='center'>
              {blog.artist_title?`Artist of blog ${blog.artist_title}`:""}
            </Typography>
          </Box>
          </>
        )
      )}
    </Container>
  );
};

export default BlogDetailPage;
