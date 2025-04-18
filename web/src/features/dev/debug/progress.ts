import { debugData } from '../../../utils/debugData';
import { ProgressbarProps } from '../../../typings';

export const debugProgressbar = () => {
  debugData<ProgressbarProps>([
    {
      action: 'progress',
      data: {
        label: 'Using Lockpick',
        duration: 8000,
      },
    },
  ]);
};

export const debugCircleProgressbar = () => {
  debugData([
    {
      action: 'circleProgress',
      data: {
        position: 'bottom',
        duration: 8000,
        label: 'Vous mangez un sandwich !',
      },
    },
  ]);
};
