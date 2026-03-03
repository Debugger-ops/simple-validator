import "./CodeBlock.css";

interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  return (
    <div className="code-block">
      {title && (
        <div className="code-block__header">
          <div className="code-block__dots">
            <div className="code-block__dot code-block__dot--red" />
            <div className="code-block__dot code-block__dot--yellow" />
            <div className="code-block__dot code-block__dot--green" />
          </div>
          <span className="code-block__title">{title}</span>
        </div>
      )}
      <pre className="code-block__pre">
        <code className="code-block__code">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;