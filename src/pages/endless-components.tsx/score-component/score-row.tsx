import { TOTAL_DIGITS } from '../../../endless_game/utils/game-consts';
import styles from './score-row.module.css';

type ScoreRowProps = {
  label: string;
  value: number;
  shouldAnimate: boolean;
};

const ScoreRow = ({ label, value, shouldAnimate }: ScoreRowProps) => {
  const scoreStr = value.toString();
  const paddedScore = scoreStr.padStart(TOTAL_DIGITS, '0');
  const leadingCount = paddedScore.length - scoreStr.length;

  const digits = paddedScore.split('').map((digit, index) => {
    const isLeading = index < leadingCount;
    return (
      <div className={styles.digitBox} key={index}>
        <span
          className={`${styles.digitText} ${isLeading ? styles.leading : ''} ${shouldAnimate ? styles.animated : ''}`}
        >
          {digit}
        </span>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.label}>{label}</h2>
      <div className={styles.scoreBlock}>{digits}</div>
    </div>
  );
};

export default ScoreRow;
