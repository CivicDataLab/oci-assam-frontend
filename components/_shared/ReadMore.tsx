import React, { useState } from 'react';

interface ReadMoreProps {
  text: string;
  amountOfWords?: number;
}

export const ReadMore = ({ text, amountOfWords = 20 }: ReadMoreProps) => {
  const id = React.useId();

  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text && text.split(' ');
  const itCanOverflow = splittedText && splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text;
  const endText = splittedText && splittedText.slice(amountOfWords - 1).join(' ');

  const handleKeyboard = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <span id={id}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span
            className={`${!isExpanded && 'hidden'}`}
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <button
            className="ml-2 text-sm text-balance"
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'show less' : 'show more'}
          </button>
        </>
      )}
    </span>
  );
};
