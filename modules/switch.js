const SetupTabs = () => {
  document.querySelectorAll('.tab__button').forEach((button) => {
    button.addEventListener('click', () => {
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(`.tab__content[data-tab ="${tabNumber}"]`);

      sideBar.querySelectorAll('.tab__button').forEach((button) => {
        button.classList.remove('tab__button--active');
      });

      tabsContainer.querySelectorAll('.tab__content').forEach((tab) => {
        tab.classList.remove('tab__content--active');
      });

      button.classList.add('tab__button--active');
      tabToActivate.classList.add('tab__content--active');
    });
  });
};

export default SetupTabs;
