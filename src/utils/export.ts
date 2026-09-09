import { jsPDF } from 'jspdf';
import { StructuredSummary } from '../types/summary';
import { formatTimestamp } from './youtube';

export function generateMarkdown(summary: StructuredSummary): string {
  const { video, tldr, executiveSummary, keyTakeaways, importantPoints, sections, facts, quotes, actionItems, concepts, pros, cons, conclusion } = summary;

  let md = `# ${video.title}\n\n`;
  md += `**Channel:** ${video.channel}  \n`;
  if (video.duration) md += `**Duration:** ${video.duration}  \n`;
  if (video.publishedAt) md += `**Published:** ${video.publishedAt}  \n`;
  md += `**Original Video:** [Watch on YouTube](${video.url})\n\n`;
  md += `*Summarized by VidBrief AI on ${new Date(summary.generatedAt).toLocaleDateString()}*\n\n`;
  md += `---\n\n`;

  // TLDR
  md += `## ⚡ TL;DR\n\n${tldr}\n\n`;

  // Executive Summary
  md += `## 📋 Executive Summary\n\n${executiveSummary}\n\n`;

  // Key Takeaways
  if (keyTakeaways?.length) {
    md += `## 🔑 Key Takeaways\n\n`;
    keyTakeaways.forEach((item, idx) => {
      md += `### ${idx + 1}. ${item.title} (${item.importance.toUpperCase()})\n${item.summary}\n\n`;
    });
  }

  // Important Points
  if (importantPoints?.length) {
    md += `## 💡 Critical Highlights & Information\n\n`;
    importantPoints.forEach(point => {
      const time = point.timestamp ? ` [${formatTimestamp(point.timestamp)}]` : '';
      md += `- **[${point.type}]${time} ${point.title}:** ${point.content}\n`;
    });
    md += `\n`;
  }

  // Sections
  if (sections?.length) {
    md += `## 📖 Detailed Topic Breakdown\n\n`;
    sections.forEach((sec, idx) => {
      const time = sec.timestamp ? ` (▶ ${formatTimestamp(sec.timestamp)})` : '';
      md += `### ${idx + 1}. ${sec.title}${time}\n\n${sec.summary}\n\n`;
      if (sec.bullets?.length) {
        sec.bullets.forEach(b => {
          md += `- ${b}\n`;
        });
        md += `\n`;
      }
    });
  }

  // Facts & Data
  if (facts?.length) {
    md += `## 📊 Key Facts & Quantitative Data\n\n`;
    md += `| Fact / Metric | Value | Context |\n`;
    md += `|---|---|---|\n`;
    facts.forEach(f => {
      md += `| ${f.fact.replace(/\|/g, '-')} | **${f.value.replace(/\|/g, '-')}** | ${f.context.replace(/\|/g, '-')} |\n`;
    });
    md += `\n`;
  }

  // Quotes
  if (quotes?.length) {
    md += `## 💬 Important Direct Quotes\n\n`;
    quotes.forEach(q => {
      const speaker = q.speaker ? ` — *${q.speaker}*` : '';
      const time = q.timestamp ? ` (at ${formatTimestamp(q.timestamp)})` : '';
      md += `> "${q.quote}"${speaker}${time}\n\n`;
    });
  }

  // Action Items
  if (actionItems?.length) {
    md += `## 🎯 Action Items & Next Steps\n\n`;
    actionItems.forEach((act, i) => {
      md += `${i + 1}. [ ] ${act}\n`;
    });
    md += `\n`;
  }

  // Concepts
  if (concepts?.length) {
    md += `## 🧠 Key Concepts Explained\n\n`;
    concepts.forEach(c => {
      md += `* **${c.term}**: ${c.explanation}\n`;
    });
    md += `\n`;
  }

  // Pros & Cons
  if (pros?.length || cons?.length) {
    md += `## ⚖️ Comparative Analysis (Pros & Cons)\n\n`;
    if (pros?.length) {
      md += `### Advantages / Positive Aspects\n`;
      pros.forEach(p => {
        const text = typeof p === 'string' ? p : p.point;
        md += `+ ${text}\n`;
      });
      md += `\n`;
    }
    if (cons?.length) {
      md += `### Considerations / Caveats\n`;
      cons.forEach(c => {
        const text = typeof c === 'string' ? c : c.point;
        md += `- ${text}\n`;
      });
      md += `\n`;
    }
  }

  // Conclusion
  if (conclusion) {
    md += `## 🏁 Final Conclusion\n\n${conclusion}\n\n`;
  }

  md += `---\n*Generated with VidBrief AI — Professional YouTube Video Briefing Platform*`;
  return md;
}

export function downloadMarkdown(summary: StructuredSummary): void {
  const md = generateMarkdown(summary);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const sanitizedTitle = summary.video.title.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
  a.href = url;
  a.download = `VidBrief_${sanitizedTitle || 'summary'}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPdf(summary: StructuredSummary): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 50;

  const checkPageOverflow = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = 50;
    }
  };

  // Header Banner
  doc.setFillColor(30, 41, 59); // Slate-800
  doc.rect(margin, cursorY, contentWidth, 36, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('VIDBRIEF AI — EXECUTIVE VIDEO BRIEFING', margin + 14, cursorY + 23);
  cursorY += 52;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const titleLines = doc.splitTextToSize(summary.video.title, contentWidth);
  checkPageOverflow(titleLines.length * 20);
  doc.text(titleLines, margin, cursorY);
  cursorY += titleLines.length * 20 + 8;

  // Metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  const metaText = `Channel: ${summary.video.channel} | Duration: ${summary.video.duration || 'N/A'} | Date: ${new Date(summary.generatedAt).toLocaleDateString()}`;
  doc.text(metaText, margin, cursorY);
  cursorY += 20;

  // Horizontal divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(1);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 16;

  // TLDR Box
  checkPageOverflow(80);
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, cursorY, contentWidth, 60, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('TL;DR OVERVIEW', margin + 12, cursorY + 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const tldrLines = doc.splitTextToSize(summary.tldr, contentWidth - 24);
  doc.text(tldrLines, margin + 12, cursorY + 34);
  cursorY += 76;

  // Helper for section headings
  const addSectionHeading = (title: string) => {
    checkPageOverflow(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, cursorY);
    cursorY += 14;
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, cursorY, margin + contentWidth, cursorY);
    cursorY += 12;
  };

  // Executive Summary
  addSectionHeading('EXECUTIVE SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const execLines = doc.splitTextToSize(summary.executiveSummary, contentWidth);
  checkPageOverflow(execLines.length * 13);
  doc.text(execLines, margin, cursorY);
  cursorY += execLines.length * 13 + 16;

  // Key Takeaways
  if (summary.keyTakeaways?.length) {
    addSectionHeading('KEY TAKEAWAYS');
    summary.keyTakeaways.forEach((k, i) => {
      checkPageOverflow(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`${i + 1}. ${k.title}`, margin, cursorY);
      cursorY += 12;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const sLines = doc.splitTextToSize(k.summary, contentWidth - 10);
      doc.text(sLines, margin + 10, cursorY);
      cursorY += sLines.length * 12 + 8;
    });
    cursorY += 8;
  }

  // Action Items
  if (summary.actionItems?.length) {
    addSectionHeading('ACTION ITEMS & RECOMMENDATIONS');
    summary.actionItems.forEach((act, i) => {
      checkPageOverflow(20);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const actLines = doc.splitTextToSize(`[ ] ${act}`, contentWidth - 10);
      doc.text(actLines, margin + 10, cursorY);
      cursorY += actLines.length * 12 + 4;
    });
    cursorY += 8;
  }

  // Conclusion
  if (summary.conclusion) {
    addSectionHeading('FINAL CONCLUSION');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const concLines = doc.splitTextToSize(summary.conclusion, contentWidth);
    checkPageOverflow(concLines.length * 13);
    doc.text(concLines, margin, cursorY);
    cursorY += concLines.length * 13 + 16;
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `VidBrief AI — Page ${i} of ${totalPages} | www.vidbrief.ai`,
      margin,
      pageHeight - 24
    );
  }

  const sanitizedTitle = summary.video.title.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
  doc.save(`VidBrief_${sanitizedTitle || 'summary'}.pdf`);
}
