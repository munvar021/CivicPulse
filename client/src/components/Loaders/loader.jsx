import React from "react";
import {
  LoaderFullscreen,
  LoaderContent,
  LoaderInline,
  CivicLoader,
  SpinnerRing,
  SpinnerRingInner,
  LoaderIcon,
  LoaderText,
  LoaderDots,
  Dot,
} from "./loaderStyles";
import DashboardSkeleton from "./Skeletons/dashboardSkeleton";

const Loader = ({
  size = "medium",
  fullScreen = false,
  text = "",
  skeleton = null,
}) => {
  if (skeleton === "dashboard") {
    return <DashboardSkeleton />;
  }

  const loaderContent = (
    <>
      <CivicLoader>
        <SpinnerRing />
        <SpinnerRingInner />
        <LoaderIcon>
          <i className="fas fa-landmark"></i>
        </LoaderIcon>
      </CivicLoader>
      {text && <LoaderText>{text}</LoaderText>}
      <LoaderDots>
        <Dot />
        <Dot $delay="0.2s" />
        <Dot $delay="0.4s" />
      </LoaderDots>
    </>
  );

  if (fullScreen) {
    return (
      <LoaderFullscreen>
        <LoaderContent>{loaderContent}</LoaderContent>
      </LoaderFullscreen>
    );
  }

  return <LoaderInline>{loaderContent}</LoaderInline>;
};

export default Loader;
