const WinnersHead = (page: number, totalWinners: number) => `
<div class="winners__header">
  <h2>Winners: (<span class="garage__span">${totalWinners}</span>)</h2>
  <h3>Page # <span class="garage__span">${page}</span></h3>
</div>`;

export default WinnersHead;
