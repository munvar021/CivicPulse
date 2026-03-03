import React from "react";
import Skeleton from "./skeletonBase";

const SkeletonStatCard = () => (
  <Skeleton.Card $height="150px">
    <Skeleton.Line $width="30%" $height="2rem" $mb="0.5rem" />
    <Skeleton.Line $width="60%" $height="2rem" $mb="0.5rem" />
    <Skeleton.Line $width="80%" $height="0.9rem" />
  </Skeleton.Card>
);

export default SkeletonStatCard;
