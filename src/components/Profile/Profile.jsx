import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ExitToApp } from "@mui/icons-material";

import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "../index";

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favouriteMovies, refetch: refetchFavourites } = useGetListQuery(
    {
      listName: "favorite/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    }
  );
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavourites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{color: "#1976d2"}} gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />{" "}
        </Button>
      </Box>
      {!favouriteMovies?.results?.length &&
      !watchlistMovies?.results?.length ? (
        <Typography variant="h6">
          Add favourites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favourite Movies" data={favouriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
