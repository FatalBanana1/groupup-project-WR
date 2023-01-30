"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

// join 1-many: group-groupimages

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "GroupImages";
		return queryInterface.bulkInsert(
			options,
			[
				{
					groupId: "1",
					url: "https://skydivemonroe.com/wp-content/uploads/3-Way-Formation-Skydive.jpg",
					preview: true,
				},
				{
					groupId: "1",
					url: "https://www.skydivetwincities.com/index_htm_files/54523@2x.jpg",
					preview: false,
				},
				{
					groupId: "1",
					url: "https://www.thrillophilia.com/blog/wp-content/uploads/2017/05/Cornwall-skydiving-1024x577.jpg",
					preview: false,
				},
				{
					groupId: "2",
					url: "https://i0.wp.com/mytheatreweekend.com/wp-content/uploads/2018/06/LyricTheatreBroadway-1350x900.jpeg?fit=1350%2C900&ssl=1",
					preview: true,
				},
				{
					groupId: "2",
					url: "https://static.wixstatic.com/media/cb8960_e141cd6df2c64a8d9e33789a240791a0~mv2.jpg/v1/fill/w_748,h_438,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/cb8960_e141cd6df2c64a8d9e33789a240791a0~mv2.jpg",
					preview: false,
				},
				{
					groupId: "2",
					url: "https://www.nycgo.com/images/events/7054/bmn_offbroadway_3000x2000_1-2__large.jpg",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://images.pexels.com/photos/3282515/pexels-photo-3282515.jpeg",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://images.pexels.com/photos/9153531/pexels-photo-9153531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://images.pexels.com/photos/700413/pexels-photo-700413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					preview: false,
				},
				{
					groupId: "3",
					url: "https://thedali.org/wp-content/uploads/2020/08/1200x500-James-Family-Wing-Groups.jpg",
					preview: true,
				},
				{
					groupId: "4",
					url: "https://www.carcovers.com/media/carcover/resource/classiccar.jpg",
					preview: true,
				},
				{
					groupId: "4",
					url: "https://cfx-wp-images.imgix.net/2017/11/DSC_0359.jpg?auto=compress%2Cformat&ixlib=php-3.3.0&s=ab2859378f945466c7393d28c535a97c",
					preview: false,
				},
				{
					groupId: "4",
					url: "https://hips.hearstapps.com/toc.h-cdn.co/assets/16/14/1954-mercedes-300sl-gullwing-a_1.jpg",
					preview: false,
				},
				{
					groupId: "5",
					url: "https://www.theladders.com/wp-content/uploads/coffee_190513.jpg",
					preview: true,
				},
				{
					groupId: "5",
					url: "https://www.goodtherapy.org/blog/blog/wp-content/uploads/2008/09/group-with-coffee.jpg",
					preview: false,
				},
				{
					groupId: "5",
					url: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322053_2200-732x549.jpg",
					preview: false,
				},
				{
					groupId: "6",
					url: "https://previews.123rf.com/images/evdoha/evdoha1501/evdoha150102965/36545329-fight-between-the-pedestrian-knights-in-a-heavy-armor-in-a-medieval-castle-against-a-stone-wall-.jpg",
					preview: false,
				},
				{
					groupId: "6",
					url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Grunwald_2003.jpg",
					preview: true,
				},
				{
					groupId: "6",
					url: "https://www.worcesterart.org/Images/Events/summer-at-wam/page-arms-and-armor-live-2x.jpg",
					preview: false,
				},
				{
					groupId: "7",
					url: "https://progamersgroup.com/assets/img/LRG__DSC7978.jpg",
					preview: true,
				},
				{
					groupId: "7",
					url: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL0xlYWd1ZS1vZi1sZWdlbmQtdGlwcy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ==",
					preview: false,
				},
				{
					groupId: "7",
					url: "https://imageio.forbes.com/specials-images/imageserve/604b8699697e8caf6ed6a644/Group-of-friends-playing-digital-games-at-home-/960x0.jpg?format=jpg&width=960",
					preview: false,
				},
				{
					groupId: "8",
					url: "https://www.webjunction.org/content/dam/WebJunction/Images/webjunction/2014-11/board-in-the-library-part-six-13.jpg",
					preview: false,
				},
				{
					groupId: "8",
					url: "https://i0.wp.com/thecatholicspirit.com/wp-content/uploads/2018/01/Boardgamegroup.jpg?ssl=1",
					preview: true,
				},
				{
					groupId: "8",
					url: "https://acrosstheboardcafe.com/wp-content/uploads/2019/02/Group.jpg",
					preview: false,
				},
				{
					groupId: "9",
					url: "https://static01.nyt.com/images/2020/06/09/well/physed-class/merlin_104986912_8f1cde71-6e5a-414a-bb26-f2e405f9f6d5-superJumbo.jpg",
					preview: true,
				},
				{
					groupId: "9",
					url: "https://www.sijcc.org/uploads/1/2/2/7/122792762/mckw1cba_orig.jpeg",
					preview: false,
				},
				{
					groupId: "9",
					url: "https://asweatlife.com/wp-content/uploads/2018/05/danielle-cerullo-642332-unsplash-1024x683.jpg",
					preview: false,
				},
				{
					groupId: "10",
					url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWM2Ct5I73x4AlgZsJBwXd49KUL2LVVLZAg&usqp=CAU",
					preview: false,
				},
				{
					groupId: "10",
					url: "https://community.thriveglobal.com/wp-content/uploads/2018/08/i-Xc8WXm8-X4.jpg",
					preview: true,
				},
				{
					groupId: "10",
					url: "https://news.emory.edu/stories/2016/01/er_meditation_group/thumbs/story_main.jpg",
					preview: false,
				},
				{
					groupId: "11",
					url: "https://thumbs.dreamstime.com/z/group-friends-fun-ski-snowboard-resort-big-snowboarders-having-snowboards-mountain-top-129747292.jpg",
					preview: false,
				},
				{
					groupId: "11",
					url: "https://www.teamusa.org/-/media/TeamUSA/Snowboarding/Group/MensSlopestyle_020122_1440x810_Updated.png",
					preview: true,
				},
				{
					groupId: "11",
					url: "https://www.crystalmountainresort.com/-/media/crystal/images/2122-images/2122-hero-images/2122-lessons/group-lessons-hero.jpg?w=480&rev=26b8bd5c1c0d48b082000638284a9d56&hash=939FA709B88C45A92F2E173A5C1FBA65",
					preview: false,
				},
				{
					groupId: "12",
					url: "https://cdn.shopify.com/s/files/1/0970/0050/files/image6-2.jpg?v=1654620423",
					preview: true,
				},
				{
					groupId: "12",
					url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfbXJtN81AG8vC1-1CPeTKd_jHEtkCUqP_4pKb8VIeek6uNQdhINBOK4R2gUhhrObmcM&usqp=CAU",
					preview: false,
				},
				{
					groupId: "12",
					url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSvDk8VWvyXz472DuwmL-3455lxCkLUxB7w&usqp=CAU",
					preview: false,
				},
				{
					groupId: "13",
					url: "https://humaneheroes.org/wp-content/uploads/2019/09/txhh_dos-donts-walking-cats.png",
					preview: true,
				},
				{
					groupId: "13",
					url: "https://i.cbc.ca/1.6521149.1657922869!/fileImage/httpImage/a-beginner-s-guide-to-walking-your-cat.jpg",
					preview: false,
				},
				{
					groupId: "13",
					url: "https://ontariospca.ca/wp-content/uploads/2020/05/short-fur-white-cat-walking-with-person-on-road-1383812.jpg",
					preview: false,
				},
				{
					groupId: "14",
					url: "https://www.brttc.org/img/IMG_0756.jpeg",
					preview: true,
				},
				{
					groupId: "14",
					url: "https://menwhoblog.com/images/blog-posts/table-tennis-vs-ping-pong-history/ping-pong-history.jpg",
					preview: false,
				},
				{
					groupId: "14",
					url: "https://wdctt.com/wp-content/uploads/2022/05/Mask-group-92.webp",
					preview: false,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "GroupImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.gte]: 0,
				},
			},
			{}
		);
	},
};
