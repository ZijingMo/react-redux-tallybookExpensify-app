import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dotenv from 'dotenv';

// Jest-Enzyme test setup
Enzyme.configure({
  adapter: new Adapter()
});


// Jest-Firebase test setup -- switching to different databases
Dotenv.config({ path: '.env.test' });

