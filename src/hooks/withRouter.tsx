import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type RouterInjectedProps = {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
};

function withRouter<P extends RouterInjectedProps>(
  Component: React.ComponentType<P>,
) {
  function ComponentWithRouterProp(props: Omit<P, keyof RouterInjectedProps>) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component
        {...(props as P)}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;