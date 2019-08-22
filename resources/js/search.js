require('./bootstrap');

import { SearchPanelManagement } from './client/management/SearchPanelManagement';
var searchPanelManagement = new SearchPanelManagement();
searchPanelManagement.init();