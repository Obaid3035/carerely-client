import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "../../component/ProgressProvider/ProgressProvider";
import { Col, Container, Row } from "react-bootstrap";
import "./FoodStats.scss";
import { getFoodProductStats } from "../../services/api/calorie";
import { useParams } from "react-router-dom";
import Loader from "../../component/Loader/Loader";

const FoodStats = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [foodStats, setFoodStats] = useState<any>(null)
  useEffect(() => {
    setIsLoading(true);
    getFoodProductStats(id!)
      .then((res) => {
        setIsLoading(false)
        setFoodStats(res.data)
      })
  }, [])

  return   (
   <Container className={"food_stats"}>
       {
         !isLoading && foodStats ? (
           <React.Fragment>
             <Row>
               <Col md={12} className={"text-center"}>
                 <h5 className={"py-3"}>CALORIES</h5>
                 {

                   <ProgressProvider interval={1000} values={[0, foodStats.calorie]}>
                     {
                       (percentage: number) => (
                         <CircularProgressbar value={percentage} text={`${percentage}%`}
                                              styles={buildStyles({
                                                pathColor: `#4AADEC`,
                                              })}
                         />
                       )
                     }
                   </ProgressProvider>
                 }
               </Col>
             </Row>
             <Row className={"mt-5 text-center"}>
               <Col md={4}>
                 <h5 className={"py-3"}>CARBS</h5>
                 {
                   <ProgressProvider interval={1000} values={[0, foodStats.carb]}>
                     {
                       (percentage: number) => (
                         <CircularProgressbar value={percentage} text={`${percentage}%`}
                                              styles={buildStyles({
                                                pathColor: `#FFA172`,
                                              })}
                         />
                       )
                     }
                   </ProgressProvider>
                 }
               </Col>
               <Col md={4}>
                 <h5 className={"py-3"}>FATS</h5>
                 {
                   <ProgressProvider interval={1000} values={[0, foodStats.fat]}>
                     {
                       (percentage: number) => (
                         <CircularProgressbar value={percentage} text={`${percentage}%`}
                                              styles={buildStyles({
                                                pathColor: `#00EAAE`,
                                              })}/>
                       )
                     }
                   </ProgressProvider>
                 }
               </Col>
               <Col md={4}>
                 <h5 className={"py-3"}>SUGAR</h5>
                 {
                   <ProgressProvider interval={1000} values={[0, foodStats.sugar]}>
                     {
                       (percentage: number) => (
                         <CircularProgressbar value={percentage} text={`${percentage}%`}
                                              styles={buildStyles({
                                                pathColor: `#FFDB7D`,
                                              })}/>
                       )
                     }
                   </ProgressProvider>
                 }
               </Col>
             </Row>
           </React.Fragment>
         ) : (
           <div className={"text-center"}>
             <Loader/>
           </div>
         )
       }


   </Container>
  )
};

export default FoodStats;
