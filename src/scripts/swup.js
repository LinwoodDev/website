import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';

const swup = new Swup({
    plugins: [new SwupHeadPlugin(), new SwupProgressPlugin()]
  });
  