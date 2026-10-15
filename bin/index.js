#!/usr/bin/env node

/**
 * GitPulse CLI
 * Lightweight, zero-dependency Git repository pulse & contributor impact analyzer.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI Colors & Styling
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  white: '\x1b[37m'
};

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return null;
  }
}

function printBanner() {
  console.log(`
${c.cyan}${c.bold}   ____ _ _   ____        _          
  / ___(_) |_|  _ \ _   _| |___  ___ 
 | |  _| | __| |_) | | | | / __|/ _ \
 | |_| | | |_|  __/| |_| | \__ \  __/
  \____|_|\__|_|    \__,_|_|___/\___| ${c.reset}${c.dim}v1.0.0${c.reset}
  ${c.dim}Interactive Git Pulse & Contributor Impact Engine${c.reset}
`);
}

function ensureGitRepo() {
  const isGit = run('git rev-parse --is-inside-work-tree');
  if (isGit !== 'true') {
    console.error(`${c.red}❌ Error: Not inside a valid git repository.${c.reset}`);
    console.error(`Please run ${c.cyan}gitpulse${c.reset} inside a directory tracked by git.\n`);
    process.exit(1);
  }
}

function analyzePulse() {
  const repoName = path.basename(run('git rev-parse --show-toplevel') || process.cwd());
  const currentBranch = run('git branch --show-current') || 'HEAD';
  const totalCommits = parseInt(run('git rev-list --count HEAD') || '0', 10);
  const firstCommitDate = run('git log --reverse --format=%cs | head -n 1') || 'Unknown';
  const latestCommitDate = run('git log -1 --format=%cs') || 'Unknown';
  const branchCount = (run('git branch -a') || '').split('\n').filter(Boolean).length;
  const tagCount = (run('git tag') || '').split('\n').filter(Boolean).length;

  console.log(`${c.bold}${c.blue}📁 Repository:${c.reset} ${c.bold}${repoName}${c.reset} ${c.dim}(${currentBranch})${c.reset}`);
  console.log(`${c.bold}📊 Total Commits:${c.reset} ${c.cyan}${totalCommits.toLocaleString()}${c.reset} | ${c.bold}Branches:${c.reset} ${branchCount} | ${c.bold}Tags:${c.reset} ${tagCount}`);
  console.log(`${c.dim}⏳ Timeline: ${firstCommitDate} ➔ ${latestCommitDate}${c.reset}\n`);

  // Contributor Breakdown
  console.log(`${c.bold}${c.magenta}👥 Contributor Leaderboard${c.reset}`);
  console.log(`${c.dim}------------------------------------------------------------${c.reset}`);

  const shortlog = run('git shortlog -sn --all --no-merges') || '';
  const lines = shortlog.split('\n').filter(Boolean);

  lines.slice(0, 8).forEach((line, idx) => {
    const parts = line.trim().match(/^(\d+)\s+(.*)$/);
    if (!parts) return;
    const count = parseInt(parts[1], 10);
    const name = parts[2];
    const pct = totalCommits > 0 ? Math.round((count / totalCommits) * 100) : 0;

    const barLength = 18;
    const filled = Math.round((pct / 100) * barLength);
    const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

    const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '  ';
    console.log(`${medal} ${c.bold}${name.padEnd(20)}${c.reset} ${c.cyan}${bar}${c.reset} ${c.yellow}${(pct + '%').padStart(4)}${c.reset} ${c.dim}(${count} commits)${c.reset}`);
  });

  // Recent 30-Day Activity Chart
  console.log(`\n${c.bold}${c.green}📈 30-Day Commit Rhythm${c.reset}`);
  console.log(`${c.dim}------------------------------------------------------------${c.reset}`);

  const recentLog = run('git log --since="30 days ago" --format=%cs') || '';
  const dayCounts = {};
  recentLog.split('\n').filter(Boolean).forEach(d => {
    dayCounts[d] = (dayCounts[d] || 0) + 1;
  });

  const dates = Object.keys(dayCounts).sort();
  if (dates.length === 0) {
    console.log(`${c.dim}No commits recorded in the past 30 days.${c.reset}`);
  } else {
    const maxDay = Math.max(...Object.values(dayCounts), 1);
    dates.slice(-14).forEach(date => {
      const cnt = dayCounts[date];
      const barLen = Math.round((cnt / maxDay) * 25);
      const bar = '■'.repeat(Math.max(1, barLen));
      console.log(`${c.dim}${date}${c.reset}  ${c.green}${bar}${c.reset} ${c.bold}${cnt}${c.reset}`);
    });
  }

  // Top File Churn (Hotspots)
  console.log(`\n${c.bold}${c.yellow}🔥 Top Modified Files (Code Churn)${c.reset}`);
  console.log(`${c.dim}------------------------------------------------------------${c.reset}`);

  const numstat = run('git log --pretty=format: --name-only -n 150') || '';
  const fileCounts = {};
  numstat.split('\n').filter(Boolean).forEach(f => {
    // ignore package-lock or binary files
    if (f.includes('package-lock.json') || f.includes('node_modules')) return;
    fileCounts[f] = (fileCounts[f] || 0) + 1;
  });

  const sortedFiles = Object.entries(fileCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (sortedFiles.length === 0) {
    console.log(`${c.dim}No files tracked yet.${c.reset}`);
  } else {
    sortedFiles.forEach(([file, touches], i) => {
      console.log(` ${c.cyan}#${i+1}${c.reset} ${file.padEnd(45)} ${c.bold}${touches}${c.reset} ${c.dim}modifications${c.reset}`);
    });
  }

  console.log(`\n${c.bold}${c.cyan}✨ Tip:${c.reset} Run ${c.bold}gitpulse --json${c.reset} to export structured metrics into CI pipelines.\n`);
}

function main() {
  printBanner();
  ensureGitRepo();

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`Usage:
  npx gitpulse [options]

Options:
  --help, -h       Display this help menu
  --json           Output repository statistics as raw JSON
  --version, -v    Display CLI version\n`);
    return;
  }

  if (process.argv.includes('--json')) {
    const data = {
      repository: path.basename(process.cwd()),
      branch: run('git branch --show-current') || 'HEAD',
      totalCommits: parseInt(run('git rev-list --count HEAD') || '0', 10),
      timestamp: new Date().toISOString()
    };
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  analyzePulse();
}

main();
