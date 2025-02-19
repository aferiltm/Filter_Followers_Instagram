document.getElementById("filterButton").addEventListener("click", function () {
  const followingInput = document.getElementById("followingInput");
  const followersInput = document.getElementById("followersInput");

  const followingFile = followingInput.files[0];
  const followersFile = followersInput.files[0];

  if (!followingFile || !followersFile) {
    alert("Silakan unggah kedua file JSON terlebih dahulu.");
    return;
  }

  const readerFollowing = new FileReader();
  const readerFollowers = new FileReader();

  readerFollowing.onload = function (event) {
    const followingData = JSON.parse(event.target.result);
    const following = followingData.relationships_following.map((item) => {
      return item.string_list_data[0].value;
    });

    readerFollowers.onload = function (event) {
      const followersData = JSON.parse(event.target.result);
      const followers = followersData.map((item) => {
        return item.string_list_data[0].value;
      });

      const notFollowingBack = following.filter((user) => !followers.includes(user));

      displayResult(notFollowingBack);
    };

    readerFollowers.readAsText(followersFile);
  };

  readerFollowing.readAsText(followingFile);
});

function displayResult(notFollowingBack) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  // Tambahkan elemen h6 dengan keterangan
  const heading = document.createElement("h6");
  heading.textContent = "Orang yang tidak mengikuti anda :";
  heading.className = "font-bold text-lg mb-1 mt-2"; // Anda bisa menambahkan kelas CSS sesuai kebutuhan
  resultDiv.appendChild(heading);

  if (notFollowingBack.length === 0) {
    resultDiv.innerHTML = "<p>Tidak ada followers yang tidak mengikuti kembali.</p>";
    return;
  }

  const list = document.createElement("ul");
  notFollowingBack.forEach((username) => {
    const listItem = document.createElement("li");
    listItem.textContent = username;
    listItem.className = "border-b border-gray-200 py-2";
    list.appendChild(listItem);
  });

  resultDiv.appendChild(list);
}
