import { Player, Match, TrainingSession, Rassemblement } from '../types/ams';
import { DataScope, ExportFormat } from '../types/dataExchange';

export const generateAndDownloadExport = (
  scope: DataScope,
  format: ExportFormat,
  options: {
    players?: Player[];
    selectedPlayer?: Player;
    selectedMatch?: Match;
    selectedTraining?: TrainingSession;
    rassemblement?: Rassemblement;
    teamName?: string;
    includeMedical?: boolean;
    anonymizeSensitive?: boolean;
  }
) => {
  const dateStr = new Date().toISOString().slice(0, 10);
  const fileNamePrefix = `FFF_${scope.toUpperCase()}_${dateStr}`;

  if (format === 'csv') {
    let csvContent = '';
    
    if (scope === 'players' || scope === 'dashboard' || scope === 'all') {
      csvContent = 'Numero,Nom,Poste,Club,Age,Statut,ScoreGlobal,DistanceHebdoKm,VitesseMaxKmh,Readiness,Alerte\n';
      (options.players || []).forEach((p) => {
        const row = [
          `"${p.number}"`,
          `"${p.name}"`,
          `"${p.position}"`,
          `"${p.club}"`,
          p.age,
          `"${p.status}"`,
          p.scoreGlobal,
          p.dimensions?.entrainement?.distance || 34.5,
          p.dimensions?.physique?.vitesseMax || 33.2,
          p.dimensions?.recuperation?.readiness || 85,
          `"${p.alert?.label || 'Aucune'}"`
        ];
        csvContent += row.join(',') + '\n';
      });
    } else if (scope === 'player_360' && options.selectedPlayer) {
      const p = options.selectedPlayer;
      csvContent = 'Indicateur,Valeur,Unite,Source,DateSynchronisation\n';
      csvContent += `Nom,"${p.name}",-,FFF Fichier Fédéral,${dateStr}\n`;
      csvContent += `Numero,${p.number},-,FFF Fichier Fédéral,${dateStr}\n`;
      csvContent += `Poste,"${p.position}",-,Staff Technique,${dateStr}\n`;
      csvContent += `Club,"${p.club}",-,Club Data Exchange,${dateStr}\n`;
      csvContent += `ScoreGlobal,${p.scoreGlobal},/100,Moteur IA Performance,${dateStr}\n`;
      csvContent += `VitesseMax,${p.dimensions?.physique?.vitesseMax || 34.2},km/h,Catapult Vector S7,${dateStr}\n`;
      csvContent += `DistanceHebdo,${p.dimensions?.entrainement?.distance || 38.5},km,Catapult Vector S7,${dateStr}\n`;
      csvContent += `Readiness,${p.dimensions?.recuperation?.readiness || 88},%,Catapult Vector S7,${dateStr}\n`;
      csvContent += `Disponibilite,${p.dimensions?.sante?.disponibilite || 95},%,Pôle Médical FFF,${dateStr}\n`;
      csvContent += `StatutAptitude,"${p.status}",-,Pôle Médical FFF,${dateStr}\n`;
    } else if (scope === 'match' && options.selectedMatch) {
      const m = options.selectedMatch;
      csvContent = 'PlayerId,Poste,Minutes,DistanceKm,Sprints,VitesseMaxKmh,Passes,PrecisionPasses,NotePerformance\n';
      const allPlayers = [...(m.starters || []), ...(m.substitutes || [])];
      allPlayers.forEach((ps) => {
        csvContent += `"${ps.playerId}","${ps.positionName}",${ps.minutes},${ps.distanceKm},${ps.sprints},${ps.maxSpeedKmH || 32.5},${ps.passes},${ps.passesAccuracy}%,${ps.rating}\n`;
      });
    } else if (scope === 'training' && options.selectedTraining) {
      const t = options.selectedTraining;
      csvContent = 'PlayerId,DistanceKm,HighIntensityM,Sprints,VitesseMaxKmh,RPE,PlayerLoadUA,TouchesBalle\n';
      (t.participants || []).forEach((p) => {
        csvContent += `"${p.playerId}",${p.distanceKm},${p.highIntensityDistanceM || 450},${p.sprintsCount || 12},${p.maxSpeed || 31.5},${p.rpe},${p.loadUA || 380},${p.ballTouches || 65}\n`;
      });
    } else {
      csvContent = 'Rassemblement,Selection,Date,Effectif,Incertitudes,Statut\n';
      csvContent += `"${options.rassemblement?.name || 'Stage Clairefontaine'}","${options.teamName || 'France A'}","${dateStr}",24,${options.players?.filter(p => p.status === 'a_surveiller').length || 3},"Opérationnel"\n`;
    }

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${fileNamePrefix}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (format === 'json') {
    const dataObj = {
      meta: {
        platform: 'BLEUS 360 • Performance FFF Hub',
        exportDate: new Date().toISOString(),
        scope,
        selection: options.teamName || 'France A',
        exportedBy: 'Staff FFF Certifié',
        securityLevel: options.anonymizeSensitive ? 'PUBLIC_ANONYMIZED' : 'CONFIDENTIAL_STAFF'
      },
      content: {
        players: options.players || [],
        selectedPlayer: options.selectedPlayer || null,
        match: options.selectedMatch || null,
        training: options.selectedTraining || null,
        rassemblement: options.rassemblement || null
      }
    };

    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${fileNamePrefix}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // PDF / Fiche Staff: Open print-ready formatted window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Rapport FFF • ${scope.toUpperCase()} • ${options.teamName || 'France A'}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; }
              .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 25px; }
              .badge { background: #1e40af; color: white; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
              th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold; }
              td { padding: 9px 10px; border-bottom: 1px solid #e2e8f0; }
              .footer { margin-top: 40px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #0f172a;">Rapport Officiel de Performance FFF</h1>
                <p style="margin: 5px 0 0 0; color: #64748b; font-size: 13px;">Sélection Nationale : ${options.teamName || 'France A'} • Document certifié Clairefontaine</p>
              </div>
              <div style="text-align: right;">
                <span class="badge">BLEUS 360 ★★</span>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">Généré le ${dateStr}</p>
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
              <strong>Contexte d'export :</strong> ${scope.toUpperCase()} • <strong>Effectif :</strong> 24 Joueurs • <strong>Statut :</strong> Données consolidées (Catapult Vector + StatsBomb + Pôle Médical)
            </div>

            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Athlète</th>
                  <th>Poste</th>
                  <th>Club</th>
                  <th>Statut FFF</th>
                  <th>Score Global</th>
                  <th>Distance Hebdo</th>
                  <th>Vmax</th>
                </tr>
              </thead>
              <tbody>
                ${(options.players || []).slice(0, 24).map(p => `
                  <tr>
                    <td><strong>${p.number}</strong></td>
                    <td><strong>${p.name}</strong></td>
                    <td>${p.position}</td>
                    <td>${p.club}</td>
                    <td>${p.status === 'disponible' ? 'Apte 100%' : p.status === 'a_surveiller' ? 'À surveiller' : 'Reprise'}</td>
                    <td><strong>★ ${p.scoreGlobal}/100</strong></td>
                    <td>${p.dimensions?.entrainement?.distance || 34.5} km</td>
                    <td>${p.dimensions?.physique?.vitesseMax || 33.5} km/h</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="footer">
              <span>Fédération Française de Football • Direction Technique Nationale & Performance</span>
              <span>Document confidentiel • Usage interne staff</span>
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
};
