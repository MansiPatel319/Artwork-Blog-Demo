import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Pagination,CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import CardComponent from '../Componenet/CardComponent';
import Defaultphoto from './../assets/image/Defaultphoto';
import useDebounce from '../Hooks/useDebounce';

const HomePage = () => {
  const [artworkData, setartworkData] = useState([]);
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const truncateTitle = (title, maxLength = 20) => {
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength) + '...';
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks/search`, {
          params: {
            page: page,
            q: debouncedSearchQuery.length >= 3 ? debouncedSearchQuery : undefined,
          },
        });
        setartworkData(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching the artworks', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearchQuery, page]);

  return (
    <Container >
      <Typography variant="h3" gutterBottom align="center">
      Home Page
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />
        {loading ? (
        <CircularProgress />
      ) : (
        artworkData.length>0 &&(
        <>
          <Grid container spacing={3}>
          {artworkData?.map((artwork, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
             <CardComponent
              id={artwork.id}
               title={truncateTitle(artwork.title)}
              content={artwork.description}
               imageUrl={artwork?.thumbnail?.lqip?artwork?.thumbnail?.lqip:Defaultphoto}
               altText={artwork.altText}
             />
           </Grid>
            ))}
          </Grid>
          <Pagination
             count={totalPages}
             page={page}
             onChange={handlePageChange}
             color="primary"
             sx={{ mt: 3,mb: 3, display: 'flex', justifyContent: 'center' }}
          />
        </>
      ))}
      {!artworkData.length&& (<>
      <Typography>
        No Data Available
      </Typography>
      </>)}
  
    </Container>
  );
};

export default HomePage;
