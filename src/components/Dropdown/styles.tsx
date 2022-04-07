import styled from 'styled-components';
import { layout, LayoutProps } from 'styled-system';

export const DropdownWrapper = styled.section`
  position: relative;
  display: inline-block;
  padding: 10px;
  background-color: #CECECE;

  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 10px;
`;

type DropdownContentProps = LayoutProps;

export const DropdownContent = styled.div<DropdownContentProps>`
  display: none;
  background-color: gray;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  margin-bottom: 10px;

  ${layout}
`;

type SelectedFiltersProps = LayoutProps;

export const SelectedFilters = styled.div<SelectedFiltersProps>`
  height: 50px;

  ${layout}
`;

export const FilterTag = styled.button`
  padding: 10px;
  margin: 0px 10px 0px 0px;

  border: 1px solid black;
  border-radius: 8px;
`