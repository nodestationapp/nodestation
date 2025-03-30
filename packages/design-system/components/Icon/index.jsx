import PropTypes from 'prop-types';
import * as HeroIcon from '@heroicons/react/24/outline'

const Icon = ({ name }) => {
  const IconComponent = HeroIcon[name];

  return <IconComponent height={20} width={20} />;
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};
