import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Country } from "../types/country";
import { visitedApi } from "../api/services/visited";
import { IconButton, Tooltip } from "@mui/material";
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";

interface VisitedButtonProps {
  country: Country;
  onToggle?: (isVisited: boolean) => void;
}

const FavoriteButton = ({country, onToggle}: VisitedButtonProps) => {
  const {user} = useAuth();
  const [isVisited, setIsVisited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!user || isInitialized) return;

    const checkvisitedtatus = async () => {
      
      try {
        const status = await visitedApi.isVisited(country.name.common);
        setIsVisited(status);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error checking visited status:", error);
      } 
    }
    checkvisitedtatus();
  }, [user, country.name.common, isInitialized])

  const handleToggleVisited = async () => {
    if(!user) return;
    setLoading(true);
      try {
        if(isVisited) {
          await visitedApi.removeVisited(country.name.common);
          setIsVisited(false);
        }
        else {
          await visitedApi.addVisited(country);
          setIsVisited(true);
        }
        if(onToggle) {
          onToggle(!isVisited);
        }
      } catch (error) {
        console.error("Error toggling visited:", error);
      } finally {
      setLoading(false);
      }
    }

    if(!user) return null;

    return (
      <Tooltip title={isVisited ? "Remove from visited" : "Add to visited"}>
        <IconButton onClick={handleToggleVisited} disabled={loading} color= "primary">
          {isVisited ? <CheckCircle/> : <CheckCircleOutline/>} 
        </IconButton>
       </Tooltip>   
    )
};

export default FavoriteButton;