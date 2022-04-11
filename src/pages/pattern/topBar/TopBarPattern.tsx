import React, { useEffect, useState } from 'react';
import { theme } from '../../../themes/theme';

import { Container, Header, Search, SearchHR, TopBar } from './styles';

const defaultProps = {
  setSortByName: null,
};

type props = {
  flag: boolean;
  setSortByName?: any;
} & typeof defaultProps;

function TopBarPattern({ flag, setSortByName }: props) {
  const [widthScreen, setWidthScreen] = useState(window.screen.width / 16);

  useEffect(() => {
    function handleResize() {
      setWidthScreen(window.screen.width / 16);
    }

    window.addEventListener('resize', handleResize);
  });

  return (
    <Container>
      <Header>
        {widthScreen > theme.screenSizes.tablet ? (
          <TopBar>
            <h3>
              Technical<strong>Share</strong>
            </h3>
          </TopBar>
        ) : null}

        {flag ? (
          <SearchHR>
            <Search
              onChange={(e) => {
                return setSortByName(e.target.value);
              }}
              placeholder="Procure o seu mentor aqui"
            />
            <hr />
          </SearchHR>
        ) : null}
      </Header>
    </Container>
  );
}

TopBarPattern.defaultProps = defaultProps;
export default TopBarPattern;
