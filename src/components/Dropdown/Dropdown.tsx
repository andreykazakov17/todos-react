/* eslint-disable react/require-default-props */
import React, { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';

import TodoInput from 'components/Input/Input';
import ActionButton from 'components/Button/Button';
import Clear from 'icons/svg/Clear';
import ArrowDown from '../../icons/svg/ArrowDown';

interface IExpandButtonStyleProps {
  transform: string;
}

const StyledExpandListButton = styled(ActionButton)<IExpandButtonStyleProps>`
  z-index: 1;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  transform: ${({ transform }) => transform};
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

const StyledDropdownInput = styled(TodoInput)`
  z-index: 1;
  height: 40px;
  width: 100%;
  font-size: 14px;
  color: #000000;
  max-width: 150px;
  ::placeholder,
  ::-webkit-input-placeholder {
    opacity: ${(props) => props.style?.opacity || '70%'};
    font-weight: ${(props) => props.style?.fontWeight || 'regular'};
  }
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
  value: string;
  placeholder?: string;
  onChange: (value: string | null) => void;
  setIsVisible: (value: boolean) => void;
}

const Dropdown = memo(
  ({
    value,
    options,
    isVisible,
    onChange,
    setIsVisible,
    placeholder = 'Select One',
  }: IDropdown) => {
    const [query, setQuery] = useState('');
    const option = options.find((item) => item.id === value);
    const popupRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleHideDropdown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
        setQuery('');
      }
    };

    const handleClickOutside = (e: Event) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsVisible(false);
        setQuery('');
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
      onChange(null);
      setQuery('');
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    };

    const handleClick = () => {
      setIsVisible(!isVisible);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
      <StyledDropdownWrapper ref={popupRef} onClick={handleClick}>
        <StyledDropdownInput
          inputRef={inputRef}
          type="text"
          placeholder={option ? option.name : placeholder}
          style={value ? { fontWeight: 'bold', opacity: '100%' } : undefined}
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
                    if (inputRef.current) {
                      inputRef.current.value = item.name;
                    }
                  }}
                >
                  {item.name}
                </StyledLI>
              ))}
            </StyledUL>
          ) : null}
        </StyledPopup>
        <SubstrateLayerDiv>
          <StyledExpandListButton transform={isVisible ? 'rotate(180deg)' : null}>
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
  },
);

export default Dropdown;
