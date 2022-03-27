import fs from "fs";
import { ScheduleService } from "../ScheduleService.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURE_PATH = `${__dirname}/fixture`;

const scheduleService = new ScheduleService();
const schedule = JSON.parse(fs.readFileSync(`${FIXTURE_PATH}/expectedSchedule.json`));

describe("schedule parsing", () => {
  it("generates the expected stream information", () => {
    const html = fs.readFileSync(`${FIXTURE_PATH}/withCarousel.html`);
    const streams = scheduleService.parseScheduleToJson(html);

    expect(streams).toStrictEqual(schedule);
  });

  it("generates the expected stream information with carousel", () => {
    const html = fs.readFileSync(`${FIXTURE_PATH}/withoutCarousel.html`);
    const streams = scheduleService.parseScheduleToJson(html);

    expect(streams).toStrictEqual(schedule);
  });

  it("generates the same stream information with and without carousel", () => {
    const htmlWithCarousel = fs.readFileSync(`${FIXTURE_PATH}/withCarousel.html`);
    const htmlWithoutCarousel = fs.readFileSync(`${FIXTURE_PATH}/withoutCarousel.html`);

    const streamsWithCarousel = scheduleService.parseScheduleToJson(htmlWithCarousel);
    const streamsWithoutCarousel = scheduleService.parseScheduleToJson(htmlWithoutCarousel);

    expect(streamsWithCarousel).toStrictEqual(streamsWithoutCarousel);
  });
})