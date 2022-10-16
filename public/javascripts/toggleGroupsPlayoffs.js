const groupStageOn = document.querySelector('.group-stage-on');
const playoffsOn = document.querySelector('.playoffs-on');
const groupStageContainer = document.querySelector('.group-stage-container');
const playoffsContainer = document.querySelector('.playoffs-container');

const showGroupStage = () => {
  groupStageContainer.classList.remove('d-none');
  groupStageContainer.classList.add('d-grid');
  playoffsContainer.classList.remove('d-grid');
  playoffsContainer.classList.add('d-none');
}

const showPlayoffs = () => {
  groupStageContainer.classList.remove('d-grid');
  groupStageContainer.classList.add('d-none');
  playoffsContainer.classList.remove('d-none');
  playoffsContainer.classList.add('d-grid');
}

groupStageOn.addEventListener('click', showGroupStage);
playoffsOn.addEventListener('click', showPlayoffs);

