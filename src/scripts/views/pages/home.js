import '../../components/hero-title';
import '../../components/explore-restaurant';
import '../../components/discover-more';

const Home = {
  async render() {
    return `
        <hero-title></hero-title>
        <explore-restaurant></explore-restaurant>
        <discover-more></discover-more>
    `;
  },
};

export default Home;
