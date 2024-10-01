import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { derivedAsync } from 'ngxtension/derived-async'

import { ElectronService } from './core/electron.service'
import { NxWelcomeComponent } from './nx-welcome.component'

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'aef-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'angular-electron-forge';
  private electron = inject(ElectronService)

  private rawVersions = derivedAsync(() => this.electron.api.getVersions<Record<string, string>>())
  dependencies = computed(() => Object.entries(this.rawVersions() || {}).map(([lib, version]) => ({ lib, version })))
}
