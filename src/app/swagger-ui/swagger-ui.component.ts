import { Component, Input } from '@angular/core';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger-ui',
  templateUrl: './swagger-ui.component.html',
})

export class SwaggerUiComponent {
  @Input() set url(url: string) {
    const ui = SwaggerUIBundle({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      url: url,
      docExpansion: 'list',
      defaultModelsExpandDepth: 0,
      operationsSorter: 'alpha'
    });
  }
}
