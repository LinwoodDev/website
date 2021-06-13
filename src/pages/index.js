import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Linwood Bot',
    imageUrl: 'img/Bot.svg',
    description: (
      <>
        Modular, free, opensource, customizable discord bot. 
      </>
    ),
  },
  {
    title: 'Butterfly',
    imageUrl: 'img/Butterfly.svg',
    description: (
      <>
        Next future, advanced, serverless, free note app
      </>
    ),
  },
  {
    title: 'Dev-Doctor',
    imageUrl: 'img/Dev-Doctor.svg',
    description: (
      <>
        Free, opensource, serverless learning platform
      </>
    ),
  },
  {
    title: 'Flow',
    imageUrl: 'img/Flow.svg',
    description: (
      <>
        Feature rich event, group and time managment system
      </>
    ),
  },
  {
    title: 'Launcher',
    imageUrl: 'img/Launcher.svg',
    description: (
      <>
        Opensource start page
      </>
    ),
  },
  {
    title: 'Discord',
    imageUrl: 'img/Discord.svg',
    description: (
      <>
        A project without a community isn't a good project. You can join the discord and talk to each other!
      </>
    ),
  }
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Welcome on the Linwood website!">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {/* <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div> */}
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
