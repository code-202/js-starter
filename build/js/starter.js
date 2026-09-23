"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../css/starter.scss");
const resources_loader_1 = __importDefault(require("./lib/resources-loader"));
const resourcesLoader = new resources_loader_1.default('app');
resourcesLoader.errorMessage = 'Oups...';
resourcesLoader.addResources(window.__ENV__.resources);
//# sourceMappingURL=starter.js.map