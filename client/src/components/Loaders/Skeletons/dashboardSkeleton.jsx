import React from "react";
import Skeleton from "./skeletonBase";
import SkeletonStatCard from "./skeletonStatCard";
import {
  DashboardSkeletonWrapper,
  SkeletonSection,
  ComplaintList,
  CenteredButton,
} from "./skeletonStyles";

const ComplaintItem = () => (
  <Skeleton.Card $padding="1rem" $height="auto">
    <Skeleton.Line $width="70%" $height="1.2rem" $mb="0.5rem" />
    <Skeleton.Line $width="40%" $height="0.8rem" />
  </Skeleton.Card>
);

const DashboardSkeleton = () => (
  <DashboardSkeletonWrapper>
    <Skeleton.Container $padding="1.5rem">
      <Skeleton.Line $width="40%" $height="2rem" $mb="0.5rem" />
      <Skeleton.Line $width="60%" $height="1rem" />
    </Skeleton.Container>

    <SkeletonSection $padding="1.5rem">
      <Skeleton.Line $width="30%" $height="1.5rem" $mb="1rem" />
      <Skeleton.Grid $cols={2} $colsMobile={1}>
        <Skeleton.Card>
          <Skeleton.Line $width="70%" $height="1rem" $mb="0.5rem" />
          <Skeleton.Line $width="90%" $height="0.8rem" $mb="1rem" />
          <Skeleton.Line $width="40%" $height="2rem" />
        </Skeleton.Card>
        <Skeleton.Card>
          <Skeleton.Line $width="70%" $height="1rem" $mb="0.5rem" />
          <Skeleton.Line $width="90%" $height="0.8rem" $mb="1rem" />
          <Skeleton.Line $width="40%" $height="2rem" />
        </Skeleton.Card>
      </Skeleton.Grid>
    </SkeletonSection>

    <SkeletonSection $padding="1.5rem">
      <Skeleton.Line $width="35%" $height="1.5rem" $mb="1rem" />
      <Skeleton.Grid $cols={4} $colsMobile={2}>
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </Skeleton.Grid>
    </SkeletonSection>

    <SkeletonSection $padding="1.5rem">
      <Skeleton.Line $width="30%" $height="1.5rem" $mb="1rem" />
      <ComplaintList>
        <ComplaintItem />
        <ComplaintItem />
        <ComplaintItem />
      </ComplaintList>
      <CenteredButton $width="20%" $height="2rem" $mt="1rem" />
    </SkeletonSection>
  </DashboardSkeletonWrapper>
);

export default DashboardSkeleton;
