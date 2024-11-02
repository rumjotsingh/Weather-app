import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import "./infobox.css"
export default function Infobox({info}){
    const hot_url="https://images.unsplash.com/photo-1496347315686-5f274d046ccc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const cold_url="https://images.unsplash.com/photo-1476400424721-e25994a9f0ff?q=80&w=1047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const rain_url="https://images.unsplash.com/photo-1501691223387-dd0500403074?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return(
        <div className="infobox">
         
            <div className="cardcantanier">
                
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity>80?rain_url:info.temp>15?hot_url:cold_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.city}
         
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"span"}>
            <p>Tempature:{info.temp}</p>
            <p>TempatureMinimum:{info.tempmin}</p>
            <p>TempatureMaximum:{info.tempmax}</p>
            <p>Feelslike:{info.feels_like}</p>
            <p>Humidity:{info.humidity}</p>
            <p>Weather can be decribed as {info.weather} feels like {info.weather}</p>
            
            
        </Typography>
      </CardContent>
     
    </Card>
    </div>
  
        </div>
    )
}