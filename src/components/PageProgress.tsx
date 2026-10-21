export function PageProgress() {
  const steps = [
    { number: '01', label: 'Add details' },
    { number: '02', label: 'Choose style' },
    { number: '03', label: 'Download & share' },
  ];

  return (
    <ol className="page-progress" aria-label="Poster creation workflow">
      {steps.map((step, index) => (
        <li
          key={step.number}
          className={index === 0 ? 'is-active' : ''}
          aria-current={index === 0 ? 'step' : undefined}
        >
          <span>{step.number}</span>
          <strong>{step.label}</strong>
        </li>
      ))}
    </ol>
  );
}
