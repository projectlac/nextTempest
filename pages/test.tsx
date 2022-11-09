import React from "react";

function test() {
  const next = () => {
    let lists = document.querySelectorAll(".item");
    lists[0].classList.remove("active");
    lists[0].classList.add("remove");
    setTimeout(() => {
      lists[0].classList.remove("remove");
      document.getElementById("slidertest").appendChild(lists[0]);
    }, 1500);
    lists[1].classList.add("active");
  };
  const prev = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slidertest").prepend(lists[lists.length - 1]);
  };
  return (
    <div>
      <button id="prev" onClick={prev}>
        Prev
      </button>
      <button id="next" onClick={next}>
        Next
      </button>
      <div id="slidertest">
        <div
          className="item active"
          style={{
            backgroundImage: `url(https://cdn.sforum.vn/sforum/wp-content/uploads/2022/10/maxresdefault-2-3.jpg)`,
          }}
        ></div>
        <div
          className="item"
          style={{
            backgroundImage:
              "url(https://gamingonphone.com/wp-content/uploads/2022/06/genshin-impact-3.0.jpg)",
          }}
        ></div>
        <div
          className="item"
          style={{
            backgroundImage:
              "url(https://i.vietgiaitri.com/2022/10/5/genshin-impact-so-huu-doanh-thu-an-tuong-sau-hai-nam-tiep-tuc-tai-dau-tu-de-phat-trien-game-c52-6677129.jpg)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default test;
