import React, { memo, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import ActionButton from 'components/Button/Button';

const StyledShowAllBtn = styled(ActionButton)`
  width: 100%;
  height: 40px;
  font-size: 12px;
  font-weight: bold;
`;

const StyledPopup = styled.div`
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  min-width: 160px;
`;

const StyledUL = styled.ul`
  padding-left: 0px;
  padding-bottom: 0px;
  list-style: none;
`;

const StyledLI = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  color: $orange;
  &:hover {
    background: rgba(254, 95, 30, 0.05);
  }
`;

interface IOptions {
  id: string;
  name: string;
}

interface IDropdown {
  options: IOptions[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const Dropdown = memo(({ value, options, onChange, placeholder = 'Select One' }: IDropdown) => {
  const [isVisible, setIsVisible] = useState(false);
  const option = options.find((item) => item.id === value);
  const ulRef = useRef<HTMLDivElement>(null);

  const handleHideDropdown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsVisible(false);
    }
  };

  const handleClickOutside = (e: Event) => {
    if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <>
      <StyledPopup ref={ulRef}>
        <StyledShowAllBtn
          onClick={() => (!isVisible ? setIsVisible(true) : setIsVisible(false))}
          color="secondary"
        >
          {option ? option.name : placeholder}
        </StyledShowAllBtn>
        {isVisible ? (
          <StyledUL>
            {options.map((option) => {
              return (
                <StyledLI
                  key={option.id}
                  id={option.id}
                  onClick={() => {
                    onChange(option.id);
                  }}
                >
                  {option.name}
                </StyledLI>
              );
            })}
          </StyledUL>
        ) : null}
      </StyledPopup>
      <div>text</div>
    </>
  );
});

export default Dropdown;
