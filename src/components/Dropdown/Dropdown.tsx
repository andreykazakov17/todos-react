/* eslint-disable react/require-default-props */
import React, { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';

import TodoInput from 'components/Input/Input';
import ActionButton from 'components/Button/Button';
import Clear from 'icons/svg/Clear';
import ArrowDown from '../../icons/svg/ArrowDown';

interface IExpandButtonStyleProps {
  isOpen: boolean;
}

const StyledExpandListButton = styled(ActionButton)<IExpandButtonStyleProps>`
  z-index: 1;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : null)};
  transform-origin: 50% 25%;
`;

const StyledClearButton = styled(ActionButton)`
  z-index: 1;
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
`;

// interface IDropdownInputProps {
//   isOpen: boolean;
// }

const StyledDropdownInput = styled(TodoInput)`
  z-index: 1;
  height: 40px;
  width: 100%;
  font-size: 14px;
  color: #000000;
  max-width: 150px;
  &:hover {
    border-color: orange;
  }
`;

const StyledPopup = styled.div`
  z-index: 1;
  position: absolute;
  margin-top: 45px;
  max-width: 200px;
  background: #ffffff;
  box-shadow: -1px 15px 15px -5px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
`;

const StyledUL = styled.ul`
  padding-left: 0px;
  padding-bottom: 0px;
  list-style: none;
  max-height: 300px;
  overflow: scroll;
  overflow-x: hidden;
`;

const StyledLI = styled.li<{ isSelected: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  background: ${({ isSelected }) => (isSelected ? 'rgba(254, 95, 30, 0.05)' : 'white')};
  &:hover {
    background: rgba(254, 95, 30, 0.05);
  }
`;

const SubstrateLayerDiv = styled.div`
  z-index: 0;
  left: 0px;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  width: 230px;
  height: 40px;
`;

const StyledDropdownWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 400px;
`;

interface IOptions {
  id: string;
  name: string;
}

interface IDropdown {
  options: IOptions[];
  isVisible: boolean;
  value: string | null;
  onChange: (value: string | null) => void;
  setIsVisible: (value: boolean) => void;
}

const Dropdown = memo(({ value, options, isVisible, onChange, setIsVisible }: IDropdown) => {
  const [query, setQuery] = useState('');
  const option = useMemo(() => options.find((item) => item.id === value), [value, options]);
  const popupRef = useRef<HTMLDivElement>(null);
  console.log('isVisible', isVisible);

  useEffect(() => {
    if (option) {
      setQuery(option.name);
    }
  }, [option]);

  const clearDropdownInput = () => {
    setIsVisible(false);
    setQuery('');
  };

  const handleHideDropdown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearDropdownInput();
    }
  };

  const handleClickOutside = (e: Event) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      clearDropdownInput();
    }
  };

  const addEventListeners = () => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
  };

  const removeEventListeners = () => {
    document.removeEventListener('keydown', handleHideDropdown, true);
    document.removeEventListener('click', handleClickOutside, true);
  };

  useEffect(() => {
    addEventListeners();

    return () => {
      removeEventListeners();
    };
  });

  const filteredOption = useMemo(
    () =>
      query
        ? options.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        : options,
    [options, query],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    setQuery('');
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <StyledDropdownWrapper ref={popupRef} onClick={handleClick}>
      <StyledDropdownInput
        value={query}
        type="text"
        placeholder="Select One"
        onChange={handleSearch}
      />
      <StyledPopup>
        {isVisible ? (
          <StyledUL>
            {filteredOption.map((item) => (
              <StyledLI
                key={item.id}
                id={item.id}
                isSelected={item.id === value}
                onClick={() => {
                  onChange(item.id);
                }}
              >
                {item.name}
              </StyledLI>
            ))}
          </StyledUL>
        ) : null}
      </StyledPopup>
      <SubstrateLayerDiv>
        <StyledExpandListButton isOpen={isVisible}>
          <ArrowDown />
        </StyledExpandListButton>
        {value ? (
          <StyledClearButton onClick={handleClear}>
            <Clear />
          </StyledClearButton>
        ) : null}
      </SubstrateLayerDiv>
    </StyledDropdownWrapper>
  );
});

export default Dropdown;
