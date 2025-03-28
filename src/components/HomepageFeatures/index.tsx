import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';


type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Sempre atualizado',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: DateComponent(),
  },
  {
    title: 'Referências bíblicas',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Contém referências para as versões <code>NVI</code>, <code>JFA</code> e <code>NVT</code>.
      </>
    ),
  },
  {
    title: 'Divisão por temas',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        As anotações não foram separadas por dia mas sim por tema, possuindo uma continuidade dos temas conforme o professor avança nos assuntos.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <BrowserOnly>
          {() =>
            description
          }
        </BrowserOnly>
      </div>
    </div>
  );
}

function DateComponent() : JSX.Element{
  return (
    <BrowserOnly>
      {() => {
        const language = navigator.language || 'en-US';
        const formattedDate = new Intl.DateTimeFormat(language).format(new Date(2024, 8-1, 6));
        return <p>Última anotação de aula foi em {formattedDate}.</p>;
      }}
    </BrowserOnly>
  );
}


export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
