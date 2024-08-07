import React, { useState, useEffect } from 'react';
import styles from './Verse.module.css';

const Verse = ({ children, reference }) => {
  const [visible, setVisible] = useState(false);
  const [verse, setVerse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://raw.githubusercontent.com/sanlean/TheologyCourse/main/verses.json');
        if (!response.ok) {
          throw new Error('Erro ao buscar os versículos');
        }

        const data = await response.json();
        const foundVerse = data.find(v => v.reference === reference);

        if (foundVerse) {
          setVerse(reference+" "+foundVerse.verse+"\nNVI");
        } else {
          setVerse('Versículo não encontrado');
        }
      } catch (error) {
        setError('Erro ao carregar os versículos');
        setVerse('');
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchVerse();
    }
  }, [visible, reference]);

  return (
    <span
      className={styles.verseContainer}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className={styles.reference}>{reference}</span>
      {visible && (
        <span className={styles.verse}>
          {loading ? 'Carregando...' : error ? error : verse}
        </span>
      )}
    </span>
  );
};

export default Verse;