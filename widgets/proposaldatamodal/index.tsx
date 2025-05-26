import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  ModalOverlay,
  ModalContent,
  Header,
  SearchWrapper,
  SearchInput,
  SearchStats,
  NavigationButtons,
  NavButton,
  ActionButtons,
  IconButton,
  Tooltip,
  JsonViewer,
  SearchIcon,
  CloseIconWrapper
} from "./styles";
import CopyIcon from "@public/images/icons/copy.png";
import CloseIcon from "@public/images/crossicon.svg";
import ArrowUpIcon from "@public/images/arrow-up.svg";
import ArrowDownIcon from "@public/images/arrow-down.svg";
import Image from "next/image";

interface ProposalJsonModalProps {
  jsonData: any;
  onClose: () => void;
}

export const ProposalJsonModal: React.FC<ProposalJsonModalProps> = ({
  jsonData,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState<number[]>([]);
  const [currentMatch, setCurrentMatch] = useState(0);
  const jsonRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (searchTerm && jsonRef.current) {
      const content = JSON.stringify(jsonData, null, 2);
      const regex = new RegExp(searchTerm, "gi");
      const foundMatches = Array.from(content.matchAll(regex))
        .map((match) => match.index)
        .filter((index): index is number => index !== undefined);

      setMatches(foundMatches);
      highlightMatches(foundMatches);
    } else {
      resetHighlights();
    }
  }, [searchTerm, currentMatch]);

  const highlightMatches = (foundMatches: number[]) => {
    if (!jsonRef.current) return;

    const content = JSON.stringify(jsonData, null, 2);
    let html = "";
    let lastIndex = 0;

    foundMatches.forEach((matchIndex, index) => {
      html += content.slice(lastIndex, matchIndex);
      const matchText = content.slice(
        matchIndex,
        matchIndex + searchTerm.length
      );

      if (index === currentMatch) {
        html += `<mark class="current">${matchText}</mark>`;
      } else {
        html += `<mark>${matchText}</mark>`;
      }

      lastIndex = matchIndex + searchTerm.length;
    });

    html += content.slice(lastIndex);
    jsonRef.current.innerHTML = html;

    const currentElement = jsonRef.current.querySelector("mark.current");
    currentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const resetHighlights = () => {
    if (jsonRef.current) {
      jsonRef.current.innerHTML = JSON.stringify(jsonData, null, 2);
    }
  };

  const handleCopy = async () => {
    const text = JSON.stringify(jsonData, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchNavigation = (direction: "prev" | "next") => {
    if (matches.length === 0) return;

    if (direction === "next") {
      setCurrentMatch((prev) => (prev + 1) % matches.length);
    } else {
      setCurrentMatch((prev) => (prev - 1 + matches.length) % matches.length);
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <Header>
          <SearchWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search in JSON..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {matches.length > 0 && (
              <>
                <SearchStats>
                  {currentMatch + 1} of {matches.length}
                </SearchStats>
                <NavigationButtons>
                  <NavButton
                    onClick={() => handleSearchNavigation("prev")}
                    title="Previous match"
                  >
                    <ArrowUpIcon />
                  </NavButton>
                  <NavButton
                    onClick={() => handleSearchNavigation("next")}
                    title="Next match"
                  >
                    <ArrowDownIcon />
                  </NavButton>
                </NavigationButtons>
              </>
            )}
          </SearchWrapper>
          <ActionButtons>
            <IconButton onClick={handleCopy}>
              <Image src={CopyIcon} alt="Copy" width={20} height={20} />
              <Tooltip>{copied ? "Copied!" : "Copy JSON"}</Tooltip>
            </IconButton>
            <IconButton onClick={onClose}>
              <CloseIconWrapper>
                <CloseIcon />
                <Tooltip>{"Close"}</Tooltip>
              </CloseIconWrapper>
            </IconButton>
          </ActionButtons>
        </Header>
        <JsonViewer ref={jsonRef}>
        {JSON.stringify(jsonData, null, 2)}
        </JsonViewer>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};
