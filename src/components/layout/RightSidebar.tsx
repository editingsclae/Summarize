import React from 'react';
import { ImportantPoints } from '../insights/ImportantPoints';
import { FactsData } from '../insights/FactsData';
import { Quotes } from '../insights/Quotes';
import { ActionItems } from '../insights/ActionItems';
import { Concepts } from '../insights/Concepts';
import { AskVideo } from '../ai/AskVideo';
import { StructuredSummary } from '../../types/summary';

interface RightSidebarProps {
  summary: StructuredSummary;
  onOpenFullChat?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ 
  summary,
  onOpenFullChat
}) => {
  return (
    <div className="w-full xl:w-[380px] shrink-0 space-y-5">
      {/* 1. Important Points */}
      <ImportantPoints 
        points={summary.importantPoints} 
        videoId={summary.video.id} 
      />

      {/* 2. Key Facts & Data */}
      <FactsData facts={summary.facts} />

      {/* 3. Important Quotes */}
      <Quotes 
        quotes={summary.quotes} 
        videoId={summary.video.id} 
      />

      {/* 4. Action Items */}
      <ActionItems items={summary.actionItems} />

      {/* 5. Concepts Explained */}
      <Concepts concepts={summary.concepts} />

      {/* 6. Ask Video AI */}
      <AskVideo 
        summary={summary} 
        onOpenFullChat={onOpenFullChat} 
      />
    </div>
  );
};
